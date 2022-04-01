package com.amadeus.enricher;

import com.amadeus.enricher.data.SubscriberHolder;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KTable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.function.BiFunction;

@SpringBootApplication
public class EnricherApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnricherApplication.class, args);
	}


	@Bean
	public BiFunction<KStream<String, String>, KTable<String, String>, KStream<String, String>> process() {
		return (newGig, subscriptionTable) -> (newGig
//				.peek((k ,v) -> System.out.println("Before: " + k + "=>" + v))
				.leftJoin(subscriptionTable,
						(gigInfo, subscribers) -> new SubscriberHolder(gigInfo, subscribers)
						)
				.map((k, v) -> new KeyValue<>(v.getSubscribers(), v.getGigInfo()))
//				.peek((k, v) -> System.out.println("After: " + k + "=>" + v))
		);
	}


}
