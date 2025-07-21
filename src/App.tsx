import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { CDNIcon } from "@alfalab/core-components/cdn-icon";
import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import bg from "./assets/bg.png";
import checked from "./assets/checked.png";
import unchecked from "./assets/unchecked.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { sendDataToGA } from "./utils/events";

const generateRandomNumbers = (
  count: number,
  min: number,
  max: number,
): number[] => {
  const randomNumbers: number[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

const get3Rows = () => [
  generateRandomNumbers(4, 1, 99),
  generateRandomNumbers(4, 1, 99),
  generateRandomNumbers(4, 1, 99),
];

const get5Tickets = () => [
  {
    selected: true,
    randomNumbers: get3Rows(),
  },
  {
    selected: true,
    randomNumbers: get3Rows(),
  },
  {
    selected: false,
    randomNumbers: get3Rows(),
  },
  {
    selected: false,
    randomNumbers: get3Rows(),
  },
  {
    selected: false,
    randomNumbers: get3Rows(),
  },
];

const TICKET_PRICE = 200;

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [step, setStep] = useState<"init" | "numbers">("init");
  const [tickets, setTickets] = useState(get5Tickets());
  const [activeSlide, setActiveSlide] = useState(0);

  const selectedTickets = tickets.filter((ticket) => ticket.selected);

  const submit = () => {
    if (!selectedTickets.length) {
      return;
    }
    window.gtag("event", "and_jackpot_july_engage_var6");
    setLoading(true);
    sendDataToGA({
      engage_price: selectedTickets.length * TICKET_PRICE,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (step === "numbers") {
    return (
      <>
        <div className={appSt.container}>
          <div className={appSt.textTitle}>
            <Typography.TitleResponsive
              tag="h1"
              view="large"
              font="system"
              weight="bold"
            >
              Альфа Джекпот
            </Typography.TitleResponsive>
            <Typography.Text view="primary-medium" color="secondary">
              Твоя комбинация — ключ к ярким мечтам
            </Typography.Text>
          </div>

          <div>
            <Swiper
              style={{ marginLeft: "0", marginTop: "2rem" }}
              spaceBetween={32}
              slidesPerView="auto"
              onSlideChange={(s) => setActiveSlide(s.activeIndex)}
            >
              {tickets.map((ticket, index) => (
                <SwiperSlide
                  key={index}
                  className={appSt.swSlide}
                  onClick={(e) => {
                    e.preventDefault();
                    setTickets((prev) =>
                      prev.map((t, i) =>
                        i === index ? { ...t, selected: !t.selected } : t,
                      ),
                    );
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <img
                      width={38}
                      height={38}
                      src={ticket.selected ? checked : unchecked}
                    />
                    {ticket.selected ? (
                      <div
                        style={{
                          marginLeft: ".25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        Выбран <span>{TICKET_PRICE} ₽</span>
                      </div>
                    ) : (
                      <div
                        style={{
                          marginLeft: ".25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        Выбрать <span>{TICKET_PRICE} ₽</span>
                      </div>
                    )}
                  </div>
                  <div className={appSt.wrap2}>
                    <div className={appSt.wrap}>
                      <div className={appSt.numbersContainer}>
                        {ticket.randomNumbers[0].map((number, index) => (
                          <div
                            key={`${number}-${index}`}
                            className={appSt.numberContaier({
                              selected: false,
                            })}
                          >
                            <Typography.TitleResponsive
                              tag="h3"
                              view="medium"
                              font="system"
                              weight="bold"
                            >
                              {number}
                            </Typography.TitleResponsive>
                          </div>
                        ))}
                      </div>
                      <div className={appSt.hr} />

                      <div className={appSt.numbersContainer}>
                        {ticket.randomNumbers[1].map((number, index) => (
                          <div
                            key={`${number}-${index}`}
                            className={appSt.numberContaier({ selected: true })}
                          >
                            <Typography.TitleResponsive
                              tag="h3"
                              view="medium"
                              font="system"
                              weight="bold"
                            >
                              {number}
                            </Typography.TitleResponsive>
                          </div>
                        ))}
                      </div>
                      <div className={appSt.hr} />

                      <div className={appSt.numbersContainer}>
                        {ticket.randomNumbers[2].map((number, index) => (
                          <div
                            key={`${number}-${index}`}
                            className={appSt.numberContaier({
                              selected: false,
                            })}
                          >
                            <Typography.TitleResponsive
                              tag="h3"
                              view="medium"
                              font="system"
                              weight="bold"
                            >
                              {number}
                            </Typography.TitleResponsive>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Typography.Text
            view="primary-small"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            Крутите вправо и выбирайте больше билетов!
          </Typography.Text>
        </div>
        <div style={{ height: "160px" }} />

        <div className={appSt.bottomBtn}>
          <ButtonMobile
            shape="rounded"
            disabled={loading}
            block
            view="secondary"
            onClick={() => {
              window.gtag("event", "and_jackpot_july_combination_var6");

              setTickets((prev) =>
                prev.map((ticket, index) => {
                  if (index === activeSlide) {
                    return { ...ticket, randomNumbers: get3Rows() };
                  }
                  return ticket;
                }),
              );
            }}
          >
            Новая комбинация
          </ButtonMobile>
          <ButtonMobile
            shape="rounded"
            loading={loading}
            block
            view="primary"
            hint={
              selectedTickets.length
                ? `${selectedTickets.length}шт ${selectedTickets.length * TICKET_PRICE} ₽`
                : "Выберите счастливую комбинацию чисел"
            }
            onClick={submit}
          >
            Участвовать
          </ButtonMobile>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive
            tag="h1"
            view="large"
            font="system"
            weight="bold"
          >
            Альфа Джекпот
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium" color="secondary">
            Участвуй и выигрывай!
          </Typography.Text>

          <img src={bg} height={170} width="100%" className={appSt.img} />
        </div>

        <Typography.Text view="primary-medium">
          Смартфон, спортзал на год или путешествие на двоих — выбирай
          комбинации чисел и выигрывай ценные призы! 🎁
        </Typography.Text>

        <div className={appSt.row}>
          <CDNIcon name="glyph_ticket-star_m" />

          <Typography.Text view="primary-medium">
            Каждый билет — шанс на мега-приз!
          </Typography.Text>
        </div>
        <div className={appSt.row}>
          <CDNIcon name="glyph_ticket-star_m" />

          <Typography.Text view="primary-medium">
            Больше билетов — больше шансов выиграть путешествие или автомобиль!
          </Typography.Text>
        </div>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          shape="rounded"
          block
          view="primary"
          onClick={() => {
            window.gtag("event", "and_jackpot_july_luck_var6");
            setStep("numbers");
          }}
        >
          <Typography.TitleResponsive
            tag="h2"
            view="small"
            font="system"
            weight="bold"
          >
            Испытать удачу
          </Typography.TitleResponsive>
        </ButtonMobile>
      </div>
    </>
  );
};
