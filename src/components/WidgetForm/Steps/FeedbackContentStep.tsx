import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackType, feedbackTypes } from "../WidgetForm";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  function handleSubmitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      screenshot,
      comment,
    });
  }

  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-500"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            src={feedbackTypes[feedbackType].image.source}
            alt={feedbackTypes[feedbackType].image.alt}
          />
          {feedbackTypes[feedbackType].title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.currentTarget.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm transition-colors hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!comment}
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
