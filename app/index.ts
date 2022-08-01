import { Tracker, UserFactory } from "@relewise/client";

const tracker = new Tracker("...", "...");

tracker.tractProductView({ productId: "p-1", user: UserFactory.anonymous() });