module.exports = function(app, db) {
  app.post("/signin/newpatient", (req,res) => {
    db.patientExists(req.body.patientInfo, (exists) => {
      if(!exists) {
        db.createPatient(req.body.patientInfo, () => res.send(true));
      } else {
        res.send(false);
      }
    }); 
  });

  app.post("/signin", (req,res) => {
    db.patientExists(req.body.patientInfo, (exists) => {
      if(!exists) {
        res.send(false);
      } else {
        db.patientSignin(req.body.patientInfo, () => res.send(true));
      }
    });
  });

  app.patch("/status/", (req,res) => {
    const newStatus = req.body.status;
    db.updateStatus(newStatus, (result) => {
      // Extract if update was successful
      res.send(result.result.ok === 1);
    });
  });

  app.get("/patients", (req, res) => {
    const onlyCheckedInPatients = req.query.checkedin;
    db.getPatients(onlyCheckedInPatients, (patients) => {
      res.send({patients: patients});
    });
  });

  app.get("*", (req,res) => {
    res.send("Error: No path matched");
  });
}





// OLD FIREBASE STUFF BELOW, delete when not necessary
/*
app.get("/groups/:group/all/:timestamp", (req, res) => {
  const groupId = req.params.group;
  const timestampParam = parseInt(req.params.timestamp);
  const excludeTimestamps = req.query.exclude;

  // :timestamp should be a number, but wasn't
  if(Number.isNaN(timestampParam)) {
    res.status(400).send({
      error: 'Invalid "' + req.params.timestamp + ' passed as timestamp'
    });
  }

  // Grab list of timestamps from groups/:groupid/timestamps
  const timestampRef = db.ref(`/groups/${groupId}/timestamps`);

  timestampRef.once("value")
    .then(snapshot => snapshot.val())
    // Only care about timestamps after the passed in time
    // and filter out keys that are labeled as exclude
    .then(keysObj => Object.keys(keysObj)
        .filter(key => {
          const currTimestamp = keysObj[key];
          if(currTimestamp < timestampParam)
            return false;

          if(Array.isArray(excludeTimestamps)) {
            return excludeTimestamps.indexOf(currTimestamp.toString()) === -1;
          }
          else {
            return excludeTimestamps !== currTimestamp;
          }
        }),
        error => [])
    // Build list of promises of updateKey to resolve
    .then(timestampKeys => {
        let promises = [];
        const updateRef = db.ref(`/groups/${groupId}/updates/timestamp`);
        timestampKeys.forEach(timestampKey=> {
          const currRef = updateRef.child(`/${timestampKey}`);
          promises.push(currRef.once("value"));
        });
        return Promise.all(promises);
    })
    .then(snapshots => snapshots.map(snapshot => snapshot.val()))
    // Have updateKeyObjs, extract updateKey and combine into one list
    .then(objs =>
      objs.reduce( (total, curr) => total.concat(Object.keys(curr)), [] )
    )
    // For each updateKey, get the actual update promise
    .then(updateKeys => {
        let promises = [];
        const updateRef = db.ref(`/groups/${groupId}/updates/`);
        updateKeys.forEach(updateKey => {
          const currRef = updateRef.child(`/${updateKey}`);
          promises.push(currRef.once("value"));
        });
        return Promise.all(promises);
    })
    .then(updates => {
        res.status(200).send({updates: updates});
    }, error => { res.status(500).send({error: 'Error: ' + error}); });
});

app.patch("/groups/:group/all", (req, res) => {
  const groupId = req.params.group;

  // When the "Send updates" button was clicked
  const timestamp = req.body.timestamp;
  // List of user updates
  const userUpdates = req.body.user_updates;

  firebase.addUpdates(userUpdates, groupId, db, timestamp)
    .then( () => res.send(true), (error) => res.status(500).send({error: error}))
});
*/

/*
app.post("/groups/:group/newpatient", (req, res) => {
  const groupId = req.params.group;
  const personId = `${req.body.firstname}${req.body.lastname}${req.body.birthday}`;
  console.log("post /group/newpatient to person " + personId);

  const ref = db.ref(`/${groupId}/${personId}`);
  ref.push(extractData(req.body));
  res.send(true);
});
*/

/*
app.get("/groups/:group/:id", (req, res) => {
  res.send("patch /groups/:group/:id")
});

app.post("/groups/:group", (req, res) => {
  res.send("patch /groups/:group/all")
});

app.patch("/groups/:group/:id", (req, res) => {
  res.send("patch /groups/:group/:id")
});

function extractData(body) {
  return {firstname: body.firstname, lastname: body.lastname, birthday: body.birthday};
}
*/