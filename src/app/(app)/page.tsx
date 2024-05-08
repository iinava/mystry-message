"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "@/data/messages.dummy.json";

import Autoplay from "embla-carousel-autoplay";
export default function Home() {

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12  text-white">
        <section className="text-center mb-8 md:mb-12">
         

          <h1 className="text-4xl font-bold text-left">Dive in to the world of anonymous🎭 Feedback</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-left">
            Mystry Message - Where your identity remains a secret.
          </p>
        </section>
        <div className="flex flex-wrap w-full justify-center align-middle gap-2 ">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl "
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 ">
                    {/* <Mail className="flex-shrink-0" /> */}
                    {/* <p className="h-10 w-10 text-4xl">💌</p> */}
                    <div>
                      <p className="text-2xl">{message.content}</p>
                      <p className="text-xs text-muted-foreground ">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        </div>

      <div className=" bottom-0 mt-36 w-full flex  justify-center h-12 align-middle ">
<p className="mt-3">© 2023 True Feedback. All rights reserved. </p>
      </div>
      </main>
    </>
  );
}
