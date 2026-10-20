const tokenPattern = "[!#$%&'*+.^_`|~0-9A-Za-z-]+";
const challengeStartPattern = new RegExp(`^(${tokenPattern})(?:\\s+(.*))?$`);
const parameterPattern = new RegExp(`^(${tokenPattern})\\s*=\\s*(?:\"((?:\\\\.|[^\"])*)\"|(${tokenPattern}))$`);

interface AuthenticationChallenge {
    scheme: string;
    parameters: string[];
    malformed: boolean;
}

export function isInvalidTokenResponse(response: Response): boolean {
    if (response.status !== 401) return false;

    const header = response.headers.get('WWW-Authenticate');
    if (!header) return false;

    return parseChallenges(header).some((challenge) => isInvalidTokenChallenge(challenge));
}

function parseChallenges(header: string): AuthenticationChallenge[] {
    const parts = splitOutsideQuotes(header);
    if (!parts) return [];

    const challenges: AuthenticationChallenge[] = [];
    let current: AuthenticationChallenge | undefined;

    for (const part of parts) {
        const trimmed = part.trim();
        const start = challengeStartPattern.exec(trimmed);
        const startsChallenge = start !== null && start[2]?.trimStart().startsWith('=') !== true;

        if (startsChallenge) {
            current = {
                scheme: start![1],
                parameters: [],
                malformed: false,
            };
            challenges.push(current);

            if (start![2]) current.parameters.push(start![2].trim());
        } else if (current) {
            current.parameters.push(trimmed);
        } else {
            return [];
        }
    }

    return challenges;
}

function splitOutsideQuotes(value: string): string[] | undefined {
    const result: string[] = [];
    let start = 0;
    let quoted = false;
    let escaped = false;

    for (let index = 0; index < value.length; index++) {
        const character = value[index];

        if (escaped) {
            escaped = false;
        } else if (quoted && character === '\\') {
            escaped = true;
        } else if (character === '"') {
            quoted = !quoted;
        } else if (!quoted && character === ',') {
            result.push(value.slice(start, index));
            start = index + 1;
        }
    }

    if (quoted || escaped) return undefined;

    result.push(value.slice(start));
    return result;
}

function isInvalidTokenChallenge(challenge: AuthenticationChallenge): boolean {
    if (challenge.scheme.toLowerCase() !== 'bearer' || challenge.malformed) return false;

    let error: string | undefined;
    for (const parameter of challenge.parameters) {
        const parsed = parameterPattern.exec(parameter);
        if (!parsed) return false;

        if (parsed[1].toLowerCase() !== 'error') continue;
        if (error !== undefined) return false;

        error = parsed[2] !== undefined ? unescapeQuotedValue(parsed[2]) : parsed[3];
    }

    return error === 'invalid_token';
}

function unescapeQuotedValue(value: string): string {
    return value.replace(/\\(.)/g, '$1');
}
