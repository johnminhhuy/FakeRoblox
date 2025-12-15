const { WebhookClient } = require('discord.js');
const id = '1436901434254688376';
const token = 'QJoSQqQGOQVCOj6zH_DpKMohDLoyZ4PyrnyjsUbyhrG6jtQBIYrseXqQlFUEqvGvm5kT'
// You only need the ID and token from your webhook URL
const webhookClient = new WebhookClient({
  id: id,
  token: token
});

exports.send = function(msg) {
    webhookClient.send(msg)
    .then(message => console.log(`!!`))
    .catch(console.error);
}