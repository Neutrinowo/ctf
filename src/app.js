const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'));

const items = {
 
  help: "All the items you can get are: \n" + "message, book, and some hidden ones!",
  message: "Welcome to the box!",
  book: "Computer & Internet Security: A Hands-on Approach 3rd ed. Edition",
  flag: "CTF_SDaT{B0x_R3al_fl4g}",
  egg: "hello!"
}

app.get('/', (req, res) => {
  res.redirect('index.html');
})

app.get('/auth', (req, res) => {
  res.json({valid: req.query.key === "Th1s_K3y_Wa5_Sh4r3d_2_nO_0n3"})
})


app.get('/get', (req, res) => {
  const target = req.query.item.toLocaleLowerCase()
  if (items.hasOwnProperty(target)) {
    if (target === "flag") {
      res.json({
        item: "The flag looks like this: SDaT{this_is_a_fake_flag}. \n" +
              "You have my word that I DID send you the real flag. \n" +
              "...if it isn't here, where is it?",
        flag: items[target]
      })
    } else {
      res.json({item: items[target]})
    }
  } else {
    res.json({item: "Item not found!"})
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})