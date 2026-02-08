import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await prisma.task.create({
        data: {
            name: body.name,
            date: new Date(body.date)
        }
    })
})
