const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');

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

function validateActionId(req, res, next) {
  const { id } = req.params;
  if (Number(id) == id) {
    actionDb
      .get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          return res.status(404).json({ message: 'Invalid action ID' });
        }
      })
      .catch(err => {
        return res
          .status(500)
          .json({ message: `The action could not be retrieved: ${err}` });
      });
  } else {
    return res.status(400).json({ message: `Your ID is garbage` });
  }
}

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'You have not passed in a body' });
  }
  if (!name || !description) {
    return res.status(400).json({ message: 'Your json is incomplete, scrub' });
  }
  next();
}

function validateAction(req, res, next) {
  const { notes, description } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'You have not passed in a body' });
  }
  if (!description || !notes) {
    return res.status(400).json({ message: 'Your json is incomplete, scrub' });
  }
  next();
}

module.exports = {
  validateProjectId,
  validateProject,
  validateAction,
  validateActionId
};
