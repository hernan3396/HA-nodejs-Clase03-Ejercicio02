const db = require("./db.js");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Home");
  });

  app.get("/teams", (req, res) => {
    console.log(req.query);
    const orderBy = parseInt(req.query.order);

    if (orderBy) {
      const arrayTeams = Object.entries(db.teams);
      if (orderBy === 1) {
        arrayTeams.sort((teamA, teamB) => {
          return teamA[1].name.localeCompare(teamB[1].name);
        });
        res.json(arrayTeams);
      } else {
        arrayTeams.sort((teamA, teamB) => {
          return teamB[1].name.localeCompare(teamA[1].name);
        });
        res.json(arrayTeams);
      }
    } else {
      res.json(db.teams);
    }
  });

  app.get("/teams/:id", (req, res) => {
    const teamId = req.params.id;
    const teamExists = db.teams.hasOwnProperty(teamId);

    if (teamExists) {
      res.json(db.teams[teamId]);
    } else {
      res.status(404).json({ error: "Equipo no encontrado" });
    }
  });

  app.post("/teams", (req, res) => {
    const teamId = req.body.id;
    const teamExists = db.teams.hasOwnProperty(teamId);

    if (teamExists) {
      res.status(409).json({ error: "El equipo ya existe" });
    } else {
      db.teams[teamId] = req.body;
      res.status(201).json(db.teams[teamId]);
    }
  });

  app.delete("/teams/:id", (req, res) => {
    const teamId = req.params.id;
    const teamExists = db.teams.hasOwnProperty(teamId);

    if (teamExists) {
      const team = db.teams[teamId];
      delete db.teams[teamId];
      res.json(team);
    } else {
      res.status(404).json({ error: "Equipo no encontrado" });
    }
  });

  app.patch("/teams/:id", (req, res) => {
    const teamId = req.params.id;
    const teamExists = db.teams.hasOwnProperty(teamId);

    if (teamExists) {
      Object.assign(db.teams[teamId], req.body);
      res.json(db.teams[teamId]);
    } else {
      res.status(404).json({ error: "Equipo no encontrado" });
    }
  });

  app.put("/teams/:id", (req, res) => {
    const teamId = req.params.id;
    const teamExists = db.teams.hasOwnProperty(teamId);

    if (teamExists) {
      db.teams[teamId] = req.body;
      res.json(db.teams[teamId]);
    } else {
      res.status(404).json({ error: "Equipo no encontrado" });
    }
  });
};
