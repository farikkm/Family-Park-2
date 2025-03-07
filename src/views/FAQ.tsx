import Header from "@/components/Header";
import Accordion from "@/components/ui/Accordion";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useHttp } from "@/hooks/useHttp";
import { useEffect, useState, Suspense } from "react";

import { useTranslation } from "react-i18next";

interface QuestionType {
  question_faq: string,
  author_faq: string
}

const FAQ = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const { t } = useTranslation()
  const [questions, setQuestions] = useState<QuestionType[]>([])

  const {request} = useHttp()

  useEffect(() => {
    document.body.removeAttribute("style");
    request(`${apiBaseUrl}/additional/faq/`, "GET", null, { "Accept-Language": 'ru' }).then(res => setQuestions(res))
  }, []);
  return (
    <>
      <Header icons="white" />

      <div id="cinema" className="relative pt-30 px-5 md:px-30 mb-10">
        <div className="blue-gradient absolute left-0 top-0 w-full h-105 -z-1" />

        <Title text="Часто задаваемые вопросы" />
        <Subtitle text="Узнайте ответы на часто задаваемые вопросы" />

        {/* ========================================== Сеансы ========================================== */}
        <div className="w-full flex justify-center">
          <div className="max-w-[800px] w-full">
            <Accordion title="FAQ" className="mt-8!" initialState="open">
              <div className="mt-5 flex flex-col gap-5 px-3">
                {questions.map((question, index) => (
                  <p key={index}>
                    <span>{ question.author_faq }: {" "}</span>
                    <span>{ question.question_faq }</span>
                    <span>{ t("home.button1") }</span>
                  </p>
                ))}
              </div>
            </Accordion>

            {/* <Accordion title="FAQ #2" className="mt-8!" initialState="close">
              <div className="mt-5 flex flex-col gap-5 px-3">
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
              </div>
            </Accordion>

            <Accordion title="FAQ #3" className="mt-8!" initialState="close">
              <div className="mt-5 flex flex-col gap-5 px-3">
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
                <p>Frequent Asked Questions</p>
              </div>
            </Accordion> */}
          </div>
        </div>
      </div>
    </>
  );
};


export default function FAQWrapper() {
  return (
    <Suspense fallback="loading..">
      <FAQ />
    </Suspense>
  )
};
