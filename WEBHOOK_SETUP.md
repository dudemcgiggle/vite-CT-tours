# Peek.com Webhook Integration Setup

## Webhook Configuration

To receive real-time booking updates from Peek.com, configure your webhook in the Peek.com dashboard:

### Webhook Endpoint
- **URL**: `https://your-domain.replit.app/webhooks/peek`
- **Method**: POST
- **Authentication**: Basic Auth

### Authentication Credentials
- **Username**: `4d516893e31c10037c7075326b2c17a6` (your API key)
- **Password**: `329904cf46df015e` (your API secret)

### Peek.com Webhook Setup
1. Log into your Peek.com dashboard
2. Navigate to: **Integrations** → **Webhooks** 
3. Official Peek webhook URL: `https://octo.peek.com/integrations/octo/webhooks`
4. Configure the webhook to point to your Replit app endpoint

### Events Handled
- **booking_update**: Automatically clears cache when bookings change
- **booking_created**: New booking notifications
- **booking_cancelled**: Cancellation updates

### Testing the Webhook
```bash
curl -X POST https://your-domain.replit.app/webhooks/peek \
  -u "4d516893e31c10037c7075326b2c17a6:329904cf46df015e" \
  -H "Content-Type: application/json" \
  -d '{"webhook": {"event": "booking_update"}, "booking": {"productId": "lighthouse-spaceflight", "optionId": "premier-4hr"}}'
```

### Cache Invalidation
The webhook automatically invalidates cached availability data when:
- New bookings are created
- Existing bookings are modified
- Bookings are cancelled

This ensures the Live Tours dashboard always shows current availability data.