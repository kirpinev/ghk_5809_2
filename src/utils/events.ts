declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: "event", v: string, data?: Record<string, string>) => void;
  }
}

type Payload = {
  engage_price: number;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbxX2Yc8AKHkuCthR3ualjAX2UnB3pRzRsr6dtfHF7YPWRpneIHJEhfdJpVHfsqKtTQ8/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, ...payload, variant: "variant6" }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
