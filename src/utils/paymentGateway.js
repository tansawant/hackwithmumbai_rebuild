
let cashfree;

export const initializeCashfree = async () => {
    return new Promise((resolve) => {
        if (window.Cashfree) {
            cashfree = new window.Cashfree({ mode: "production" });
            resolve(cashfree);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.onload = () => {
            cashfree = new window.Cashfree({ mode: "production" });
            resolve(cashfree);
        };
        document.body.appendChild(script);
    });
};

export const createOrder = async (orderData) => {
    // Call our Vercel Serverless Function to avoid CORS and hide keys
    // This assumes /api/createOrder is handled by vercel rewrites or functions
    const url = "/api/payment";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok || !data.payment_session_id) {
            console.error("Cashfree API Error Response:", data);
            throw new Error(data.message || "No Payment Session ID generated");
        }

        console.log("Cashfree Order Created:", data);
        return data;
    } catch (error) {
        console.error("Cashfree Order Creation Error:", error);
        throw error;
    }
};

export const doPayment = async (paymentSessionId) => {
    if (!cashfree) await initializeCashfree();

    const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self"
    };

    return cashfree.checkout(checkoutOptions);
};
