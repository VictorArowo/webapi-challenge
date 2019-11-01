const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel');
const {
  validateProjectId,
  validateAction,
  validateActionId
} = require('../middlewares');

router.post('/:id', validateAction, validateProjectId, (req, res) => {
  const { notes, completed, description } = req.body;
  const { id } = req.params;

  actionDb
    .insert({
      project_id: id,
      description,
      completed: completed || false,
      notes
    })
    .then(action => {
      return res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.get('/', (req, res) => {
  actionDb
    .get()
    .then(actions => {
      return res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.get('/:id', validateActionId, (req, res) => {
  return res.status(200).json(req.action);
});

router.delete('/:id', validateActionId, (req, res) => {
  const { id } = req.params;

  actionDb
    .remove(id)
    .then(action => {
      return res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
  const { id } = req.params;
  const { notes, completed, description } = req.body;
  const { action } = req;

  actionDb
    .update(id, {
      project_id: action.id,
      notes,
      description,
      completed: completed || action.completed
    })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' + err.message });
    });
});

module.exports = router;
