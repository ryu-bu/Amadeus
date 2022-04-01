package com.amadeus.enricher.data;

public class SubscriberHolder {
    private String gigInfo;
    private String subscribers;

    public SubscriberHolder(String gigInfo, String subscribers) {
        this.gigInfo = gigInfo;
        this.subscribers = subscribers;
    }

    public String getGigInfo() {
        return gigInfo;
    }
    public String getSubscribers() {
        return subscribers;
    }
}
