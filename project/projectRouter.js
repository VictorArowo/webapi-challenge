const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel');

router.post('/', validateProject, (req, res) => {
  const { name, desciption, completed } = req.body;

  projectDb
    .insert({ name, desciption, completed: completed || false })
    .then(project => {
      return res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.get('/', (req, res) => {
  projectDb
    .get()
    .then(projects => {
      return res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  return res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  const { id } = req.params;

  projectDb
    .getProjectActions(id)
    .then(actions => {
      return res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(project => {
      return res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const { id } = req.params;
  const { name, desciption, completed } = req.body;

  projectDb
    .update(id, { name, desciption, completed: completed || false })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

//custom middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;
  if (Number(id) == id) {
    projectDb
      .get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          return res.status(404).json({ message: 'Invalid project ID' });
        }
      })
      .catch(err => {
        return res
          .status(500)
          .json({ message: `The project could not be retrieved: ${err}` });
      });
  } else {
    return res.status(400).json({ message: `Your ID is garbage` });
  }
}

function validateProject(req, res, next) {
  const { name, desciption } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'You have not passed in a body' });
  }
  if (!name || !desciption || !completed) {
    return res.status(400).json({ message: 'Your json is incomplete, scrub' });
  }
  next();
}

module.exports = router;
