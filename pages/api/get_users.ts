import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_URL = process.env.API_BASE_URL;
const TOTAL_USERS_PER_PAGE = process.env.API_TOTAL_USERS_PER_PAGE;
const API_TOKEN = process.env.API_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const currentPage = body.page;
    try {
        const API_LINK = `${BASE_URL}/search/users?q=${body.query}&per_page${TOTAL_USERS_PER_PAGE}&page=${currentPage}`
        const headers = {
            "Authorization": `token ${API_TOKEN}`
        }
        let response = await fetch(API_LINK, {
            headers
        }),
            result = await response.json();

        res.status(200).json({
            ...result
        })
    } catch (e: any) {

    }
}