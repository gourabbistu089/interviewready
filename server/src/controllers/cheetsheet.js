
const Cheatsheet = require('../models/Cheatsheet');
const  getAllLanguages = async (req, res) => {
  try {
    const languages = await Cheatsheet.find({}, { language: 1, title: 1, _id: 0 });
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get cheatsheet by language
const getCheetsheetByLanguage =  async (req, res) => {
  try {
    const { language } = req.params;
    const cheatsheet = await Cheatsheet.findOne({ language });
    
    if (!cheatsheet) {
      return res.status(404).json({ error: 'Cheatsheet not found' });
    }
    
    res.json(cheatsheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Search across all cheatsheets
const searchCheatsheets = async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');
    
    const results = await Cheatsheet.aggregate([
      {
        $match: {
          $or: [
            { 'sections.title': searchRegex },
            { 'sections.items.concept': searchRegex },
            { 'sections.items.code': searchRegex },
            { 'sections.items.tags': searchRegex }
          ]
        }
      },
      {
        $project: {
          language: 1,
          title: 1,
          sections: {
            $filter: {
              input: '$sections',
              cond: {
                $or: [
                  { $regexMatch: { input: '$$this.title', regex: searchRegex } },
                  {
                    $anyElementTrue: {
                      $map: {
                        input: '$$this.items',
                        as: 'item',
                        in: {
                          $or: [
                            { $regexMatch: { input: '$$item.concept', regex: searchRegex } },
                            { $regexMatch: { input: '$$item.code', regex: searchRegex } },
                            { $in: [searchRegex, '$$item.tags'] }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ]);
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create new cheatsheet (Admin only)
const createCheatsheet = async (req, res) => {
  try {
    const cheatsheet = new Cheatsheet(req.body);
    await cheatsheet.save();
    res.status(201).json(cheatsheet);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Cheatsheet for this language already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

// Update cheatsheet
const updateCheatsheet = async (req, res) => {
  try {
    const { language } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    
    const cheatsheet = await Cheatsheet.findOneAndUpdate(
      { language },
      updatedData,
      { new: true, runValidators: true }
    );
    
    if (!cheatsheet) {
      return res.status(404).json({ error: 'Cheatsheet not found' });
    }
    
    res.json(cheatsheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete cheatsheet
const deleteCheatsheet = async (req, res) => {
  try {
    const { language } = req.params;
    const cheatsheet = await Cheatsheet.findOneAndDelete({ language });
    
    if (!cheatsheet) {
      return res.status(404).json({ error: 'Cheatsheet not found' });
    }
    
    res.json({ message: 'Cheatsheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllLanguages, getCheetsheetByLanguage, searchCheatsheets, createCheatsheet, updateCheatsheet, deleteCheatsheet };