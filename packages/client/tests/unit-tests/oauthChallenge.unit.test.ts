import { describe, expect, test } from '@jest/globals';
import { isInvalidTokenResponse } from '../../src/oauthChallenge';

function response(challenge: string, status = 401): Response {
    return {
        status,
        headers: new Headers({ 'WWW-Authenticate': challenge }),
    } as unknown as Response;
}

describe('OAuth invalid-token challenge parsing', () => {
    test.each(['Bearer error="invalid_token"', 'Bearer realm="relewise", error="invalid_token"', 'Bearer error="invalid_token", realm="relewise"', 'bEaReR realm="relewise", ERROR = invalid_token', 'Bearer error_description="Expired, please renew", error="invalid_token"', 'Bearer error_description="A \\"quoted\\" value, with commas", error="invalid_token"', 'Basic realm="other", Bearer realm="relewise", error="invalid_token"'])('accepts a valid challenge: %s', (challenge) => {
        expect(isInvalidTokenResponse(response(challenge))).toBe(true);
    });

    test.each(['Bearer realm="relewise"', 'Bearer error="insufficient_scope"', 'Bearer error="INVALID_TOKEN"', 'Basic error="invalid_token"', 'Bearer error_description="invalid_token"', 'Bearer error="invalid_token", error="insufficient_scope"', 'Bearer error="insufficient_scope", error="invalid_token"', 'Bearer error="invalid_token", realm="unterminated'])('rejects another or malformed challenge: %s', (challenge) => {
        expect(isInvalidTokenResponse(response(challenge))).toBe(false);
    });

    test('does not retry a non-401 response', () => {
        expect(isInvalidTokenResponse(response('Bearer error="invalid_token"', 403))).toBe(false);
    });
});
