const ShortUrl = require('../models/ShortUrl');

const { nanoid } = require('nanoid');

const shortenUrl = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w- .\/?%&=]*)?$/;
    if (!urlRegex.test(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const short_code = nanoid(7);
    try {
        const newUrl = new ShortUrl({
            original_url: url,
            short_code: short_code
        });
        await newUrl.save();
        res.status(201).json({ short_url: `${process.env.BASE_URL}/${short_code}`, code: short_code, original_url: url });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAnalytics = async (req, res) => {
    const { code } = req.params;
    try {
        const urlData = await ShortUrl.findOne({ short_code: code }).select('click_count');
        if (!urlData) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.status(200).json(urlData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const redirectUrl = async (req, res) => {
    const { code } = req.params;
    try {
        const urlData = await ShortUrl.findOne({ short_code: code });
        if (!urlData) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        urlData.click_count++;
        await urlData.save();
        res.status(302).redirect(urlData.original_url);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    shortenUrl,
    getAnalytics,
    redirectUrl
}