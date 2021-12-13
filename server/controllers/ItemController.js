const Item = require("../models/Item");
const { validateItemBody } = require("../utils/validations");

const getItem = async (req, res) => {
  try {
    const item = await Item.findOne({ itemId: req.query.itemId });

    res.status(200).json({
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const createItem = async (req, res) => {
  try {
    const validationErrors = validateItemBody(req.body);

    if (validationErrors.length) {
      return res.status(400).json({
        msg: "Fields missing",
        errors: validationErrors,
      });
    }

    const itemExists = await Item.findOne({
      itemId: req.body.itemId,
      userId: req.user._id,
    });

    if (itemExists) {
      return res.status(400).json({
        msg: "Item alredy exists",
      });
    }

    const item = await Item.create({ ...req.body, userId: req.user._id });
    const { _doc } = item;
    res.status(201).json({
      item: _doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const getAll = async (req, res) => {
  try {
    let filterQuery = {};
    const limit = req.query.perPage || 10;
    const skip = limit * (req.query.pageNum - 1);

    if (req.query.search) {
      filterQuery = {
        ...filterQuery,
        itemName: { $regex: req.query.search, $options: "i" },
      };
    }

    if (req.query.category) {
      filterQuery = { ...filterQuery, itemCategory: req.query.category };
    }

    let items;

    if (req.query.sortBy === "price") {
      items = await Item.find(filterQuery)
        .skip(skip)
        .limit(limit)
        .sort({ [req.query.sortBy]: req.query.sortOder });
    } else {
      items = await Item.find(filterQuery).skip(skip).limit(limit);
    }

    const hasMore = (await Item.find(filterQuery).count()) > skip + limit;

    console.log(hasMore);

    res.status(200).json({
      items,
      hasMore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ itemId: req.query.id });

    if (req.user._id === item.userId) {
      const item = await Item.delete({ itemId: req.query.id });

      return res.status(200).json({
        message: "Item Deleted successfully",
      });
    }

    res.status(418).json({
      message: "Not allowed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const udpateItem = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await Item.findOne({ itemId: id });

    if (req.user._id === item.userId) {
      const item = await Item.updateOne({ itemId: id }, req.body);

      return res.status(200).json({
        message: "Item updated successfully",
        item,
      });
    }

    res.status(418).json({
      message: "Not allowed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const getUniqueCategories = async (req, res) => {
  try {
    const categories = await Item.distinct("itemCategory");

    res.status(400).json({
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  getItem,
  createItem,
  getAll,
  deleteItem,
  udpateItem,
  getUniqueCategories,
};
