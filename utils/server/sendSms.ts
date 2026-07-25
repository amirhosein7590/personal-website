


type SmsResponse = {
    Success: boolean,
    ErrorCode: number | string | null,
    Error: string | null,
    Result: {
        UserTraceId: string | null,
        Id: number,
        Sender: number,
        FinalText: string
    }[]
}

export type SendSms = (data: Record<string, string>) => Promise<SmsResponse>

const sendSms: SendSms = async ({
    patternKey,
    phoneNumber,
    param1 = "",
    param2 = "",
    param3 = "",
    text = "",
}) => {
    if (patternKey) {
        try {
            const urlBase = process.env.SMS_URL;
            const url = `${urlBase}?ApiKey=${process.env.SMS_API_KEY}&TemplateKey=${patternKey}&Destination=${phoneNumber}&p1=${param1}&p2=${param2}&p3=${param3}`;
            const headers = {
                "Content-Type": "text/plain",
            };

            const res = await fetch(url, { headers });
            const data = res.json();
            return { ...data, success: true };
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const url = "http://api.sms-webservice.com/api/V3/SendBulk";
            const bodyReq = {
                ApiKey: process.env.SMS_API_KEY,
                Text: text,
                Sender: process.env.sender,
                Recipients: [
                    {
                        Destination: phoneNumber,
                        UserTraceId: 0,
                    },
                ],
            };
            const headers = {
                "Content-Type": "application/json",
            };


            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(bodyReq),
                headers,
            })
            const data = await res.json();
            return { ...data, success: true };
        } catch (error) {
            console.log(error);
        }
    }
}

export default sendSms
