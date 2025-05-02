export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  const clientId = process.env.WITHINGS_CLIENT_ID;
  const clientSecret = process.env.WITHINGS_CLIENT_SECRET;
  const redirectUri = "https://v0-new-project-ypyajez29xx.vercel.app/api/oauth";

  try {
    const response = await fetch("https://wbsapi.withings.net/v2/oauth2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        action: "requesttoken",
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();
    console.log("OAuth token exchange success:", data);
    res.status(200).json({ message: "OAuth successful", data });
  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).json({ error: "OAuth failed" });
  }
}
