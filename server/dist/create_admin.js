"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'superadmin@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    let adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                name: 'admin',
                description: 'Super Administrator',
                permissions: JSON.stringify(['*']),
            },
        });
    }
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            roleId: adminRole.id,
        },
        create: {
            email,
            name: 'Super Admin',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });
    console.log(`Admin user created/updated: ${user.email} / ${password}`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=create_admin.js.map