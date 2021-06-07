//auth state change listener
auth.onAuthStateChanged(user => {
    if(user){
        console.log('user logged in')
        var uid = user.uid;
        // if(user.userType == 'Artist'){
            
        // }else{
            db.collection('clients').where('uid','==',uid).get().then(snapshot =>{
                snapshot.docs.forEach(doc =>{
                    console.log(doc.data());
                        // document.getElementById('profile-full-name').innerHTML = `${doc.data().name}`
                        // document.getElementById('inputName').value = `${doc.data().name}`
                        // document.getElementById('inputEmail').value = `${doc.data().email}`
                        // document.getElementById('inputPhone').value = `${doc.data().phone}`
                        // document.getElementById('inputState').value = `${doc.data().state}`
                })
            })
        // }
    }else{
        console.log("user logged out")
    }
})

//sign in users as artists
    const artistForm = document.querySelector('#artist-form');
    
    if(artistForm == null){
        console.log("Artist Event Listener is null")
    }else{
        artistForm.addEventListener('submit', (e) => {
            e.preventDefault();
        
        const userType = "Artist"    
        const email = artistForm['artist-email'].value;
        const password = artistForm['artist-password'].value;
        
        auth.createUserWithEmailAndPassword(email,password).then(cred=>{
            var uid = cred.user.uid;
            return db.collection('artists').doc(cred.user.uid).set({
                name: artistForm['artist-name'].value,
                uid: uid,
                email: email,
                artistType: document.getElementById('artist-type').value,
                genre: document.getElementById('genre').value,
                instrument: document.getElementById('instrument').value,
                links: document.getElementById('link1').value,
                state: document.getElementById('artist-state').value,
                phone: document.getElementById('artist-phone').value,
                fee: document.getElementById('artist-fee').value,
                userType: userType
            }).then(()=>{
                db.collection('artists').where("uid", "==", uid).get().then((snapshot)=>{
                    snapshot.docs.forEach((doc)=>{
                        // window.location.href = "ardashboard.html"
                        console.log("lalala")
                        console.log(doc.data());
                        // document.getElementById('profile-full-name').innerHTML = `${doc.data().name}`
                        artistForm.reset();
                });
              });    
            });
          });
        });
       };

//sign up users as clients
        const clientForm = document.querySelector('#client-form');
    if(clientForm == null){
        console.log("Client Event Listener is null");
    }else{
    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get user info
        const email = clientForm['client-email'].value;
        const password = clientForm['client-password'].value;
      
        // sign the user in as an client
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            const uid = cred.user.uid;
            return db.collection('clients').doc(cred.user.uid).set({
                name: clientForm['client-name'].value,
                uid: uid,
                email: email,
                state: document.getElementById('client-state').value,
                phone: document.getElementById('client-phone').value,
                userType: 'Client'
            }).then(()=>{
                db.collection('clients').where("uid", "==", uid).get().then((snapshot)=>{
                    snapshot.docs.forEach((doc)=>{
                       console.log(doc.data())
                        clientForm.reset();
                        window.location.href ="cldashboard.html"
              });
            });    
          });
        });
      });      
     };   

//  //get artist documents from firestore
//  db.collection('artists').get().then((snapshot)=>{
//     snapshot.docs.forEach((doc)=>{
//       console.log(doc.data());
//     });
//   });
// // get client documents from firestore
//   db.collection('clients').get().then((snapshot)=>{
//     snapshot.docs.forEach((doc)=>{
//       console.log(doc.data());
//     });
//   });