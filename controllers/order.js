// const sgMail = require('@sendgrid/mail');
const Order = require('../models/order');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.createOrder = (req, res, next) => {
  const order = new Order({
    ...req.body
  });
  order.save()
    .then(() => res.status(201).json({ message: 'Commande enregistrée!', order: order }))
    .catch(error => res.status(400).json({ error }));

  // var products = "";
  // var specialRequest = "";

  // req.body.products.forEach(item => {
  //   products += `<tr>
  //                   <td>${item.title}</td>
  //                   <td>${item.quantity}</td>
  //                   <td>${item.price}€</td>
  //                   <td>${(item.price * item.quantity).toFixed(2)}€</td>
  //               </tr>`;
  // });

  // if(req.body.message != ''){
  //   specialRequest = `Nous avons bien reçu votre message : <p>${req.body.message}</p>`;
  // } else {
  //   specialRequest = `<p>Vous n'avez pas spécifié de message ou de demande particulière</p>`;
  // }

  //   const msg = {
  //       to: 'jerome_baille@hotmail.com', // Change to your recipient
  //       from: {
  //         name: `Mes gourMandy's`,
  //         email: 'baille.jerome@gmail.com'
  //       }, // Change to your verified sender
  //       subject: 'Votre commande sur Mes gourMandy\'s',
  //       text: 'and easy to do anywhere, even with Node.js',
  //       html: `<style>
  //                 table, th, td {
  //                     border:1px solid black;
  //                 }
  //             </style>

  //             <h1>Mes gourMandy’s</h1>							
  //             <br/>
  //             <strong>Objet : Confirmation de commande</strong>
  //             <br/>
  //             <br/>Bonjour ${req.body.firstName},
  //             <br/>
  //             <br/>Nous vous remercions de votre commande. 
  //             <br/>Nous vous tiendrons informé par e-mail lorsque celle-ci sera disponible.
  //             <br/>
  //             <br/>
  //             <br/>Récapitulatif de votre commande :
  //             <br/>
  //             <table>
  //                 <tr>
  //                     <th>Produit</th>
  //                     <th>Quantité</th>
  //                     <th>Prix unitaire</th>
  //                     <th>Prix total</th>
  //                 </tr>
  //                 ${products}
  //               </table>
  //             <br/>
  //             <br/>Montant total de la commande: <strong>${req.body.totalPrice} €</strong>
  //             <br/>
  //             <br/>${specialRequest}
  //             <br/>
  //             <br/>
  //             <br/>Merci de votre confiance,
  //             <br/>Nous restons bien entendu à votre disposition pour toute information.
  //             <br/>
  //             <br/>Cordialement,
  //             <br/>Mes gourMandy’s`,
  //     }
  //   try {
  //       sgMail.send(msg);
  //       res.status(200).json("Message Successfully Sent!");
  //     } catch (error) {
  //       res.status(200).json(error.message);
  //     }

      
}

exports.getOneOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then(order => res.status(200).json(order))
    .catch(error => res.status(404).json({ error }));
}

exports.getOrderByUserId = (req, res, next) => {
  Order.find({ userId: req.params.userId })
    .then(orders => res.status(200).json(orders))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then(orders => res.status(200).json(orders))
    .catch(error => res.status(400).json({ error }));
}

exports.updateOrderStatus = (req, res, next) => {
  Order.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commande modifiée !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.updateOrderNotification = (req, res, next) => {
  const firstName = req.body.order.firstName;
  const lastName = req.body.order.lastName;
  const email = req.body.order.email;
  const orderNumber = req.body.order._id;
  const status = req.body.order.status;

  return res.status(200).json({ message: 'Notification envoyée !', firstName, lastName, email, orderNumber, status });

  // const msg = {
  //   to: 'jerome_baille@hotmail.com', // Change to your recipient
  //   from: {
  //     name: `Mes gourMandy's`,
  //     email: 'baille.jerome@gmail.com'
  //   }, // Change to your verified sender
  //   subject: 'Votre commande sur Mes gourMandy\'s',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: `Bonjour ${firstName} ${lastName},
  //           <br/>
  //           <br/>Nous vous informons que le statut de votre commande n°${orderNumber} est à présent défini à ${status}.
  //           <br/>
  //           <br/>Merci de votre confiance,
  //           <br/>Nous restons bien entendu à votre disposition pour toute information.
  //           <br/>
  //           <br/>Cordialement,
  //           <br/>Mes gourMandy’s`,
  // }
  // try {
  //   sgMail.send(msg);
  //   res.status(200).json("Message Successfully Sent!");
  // } catch (error) {
  //   res.status(200).json(error.message);
  // }
}

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commande supprimée !' }))
    .catch(error => res.status(400).json({ error }));
}

// Path: models\order.js