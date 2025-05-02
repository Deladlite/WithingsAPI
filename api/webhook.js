export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Received webhook:", req.body);
    return res.status(200).json({ message: "Webhook received" });
  }

  // For GET requests (used by Withings to test connectivity)
  res.status(200).send("Webhook endpoint is live");
}
