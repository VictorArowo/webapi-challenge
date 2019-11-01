const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel');
const { validateProject, validateProjectId } = require('../middlewares');

router.post('/', validateProject, (req, res) => {
  const { name, description, completed } = req.body;

  projectDb
    .insert({ name, description, completed: completed || false })
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

  projectDb
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
  const { name, description, completed } = req.body;

  projectDb
    .update(id, { name, description, completed: completed || false })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

module.exports = router;
