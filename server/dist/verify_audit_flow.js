"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const baseUrl = 'http://localhost:3000/api';
const adminEmail = `admin_test_${Date.now()}@example.com`;
const adminPassword = 'password123';
async function run() {
    console.log('1. Register/Login as admin...');
    let token;
    let adminId;
    const registerRes = await (0, node_fetch_1.default)(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword, name: 'Admin Test' }),
    });
    if (registerRes.ok) {
        const data = await registerRes.json();
        token = data.access_token;
        adminId = data.user.id;
        console.log('Admin registered.');
    }
    const seedAdminEmail = 'superadmin@example.com';
    const seedAdminPassword = 'password123';
    const loginRes = await (0, node_fetch_1.default)(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: seedAdminEmail, password: seedAdminPassword }),
    });
    if (!loginRes.ok) {
        console.error('Seed Admin Login failed:', await loginRes.text());
        console.log('Maybe the DB was not seeded? Please ensure "npm run prisma:seed" was run.');
        return;
    }
    const loginData = await loginRes.json();
    token = loginData.access_token;
    adminId = loginData.user.id;
    console.log('Seed Admin Login successful.');
    console.log('2. Create a new skill...');
    const skillData = {
        title: 'Audit Test Skill ' + Date.now(),
        description: 'Testing audit flow',
        content: '# Hello\nThis is a test.',
        tags: ['test', 'audit'],
        icon: 'Zap',
        color: 'bg-blue-100 text-blue-600'
    };
    const createRes = await (0, node_fetch_1.default)(`${baseUrl}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skillData),
    });
    if (!createRes.ok) {
        console.error('Create skill failed:', await createRes.text());
        return;
    }
    const newSkill = await createRes.json();
    console.log(`Skill created: ${newSkill.id}, status: ${newSkill.status}`);
    if (newSkill.status !== 'pending') {
        console.error('Error: New skill should be pending');
    }
    console.log('3. Verify public list (should NOT contain the skill)...');
    const publicListRes = await (0, node_fetch_1.default)(`${baseUrl}/skills`);
    const publicList = await publicListRes.json();
    const inPublic = publicList.find((s) => s.id === newSkill.id);
    if (inPublic) {
        console.error('Error: Skill found in public list but should be pending');
    }
    else {
        console.log('Success: Skill not in public list.');
    }
    console.log('3.5. Verify user skills list (should contain pending skill)...');
    const userSkillsRes = await (0, node_fetch_1.default)(`${baseUrl}/skills/user/${adminId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const userSkills = await userSkillsRes.json();
    const inUserSkills = userSkills.find((s) => s.id === newSkill.id);
    if (inUserSkills && inUserSkills.status === 'pending') {
        console.log('Success: Skill found in user skills list with status pending (Owner view).');
    }
    else {
        console.error('Error: Skill not found in user skills list or status incorrect', inUserSkills);
    }
    console.log('3.6. Verify other user view (should NOT see pending skill)...');
    const viewerEmail = `viewer${Date.now()}@example.com`;
    const viewerPassword = 'password123';
    let viewerToken;
    const viewerRegisterRes = await (0, node_fetch_1.default)(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: viewerEmail, password: viewerPassword, name: 'Viewer' }),
    });
    if (viewerRegisterRes.ok) {
        const data = await viewerRegisterRes.json();
        viewerToken = data.access_token;
    }
    else {
        const viewerLoginRes = await (0, node_fetch_1.default)(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: viewerEmail, password: viewerPassword }),
        });
        const data = await viewerLoginRes.json();
        viewerToken = data.access_token;
    }
    const viewerViewRes = await (0, node_fetch_1.default)(`${baseUrl}/skills/user/${adminId}`, {
        headers: { 'Authorization': `Bearer ${viewerToken}` }
    });
    const viewerViewList = await viewerViewRes.json();
    const inViewerView = viewerViewList.find((s) => s.id === newSkill.id);
    if (inViewerView) {
        console.error('Error: Pending skill is visible to other user!');
    }
    else {
        console.log('Success: Pending skill is NOT visible to other user.');
    }
    console.log('4. Admin list verification (with filter)...');
    const adminListRes = await (0, node_fetch_1.default)(`${baseUrl}/skills/admin/list?status=pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const adminList = await adminListRes.json();
    const inAdminList = adminList.find((s) => s.id === newSkill.id);
    if (inAdminList) {
        console.log('Success: Skill found in admin pending list.');
    }
    else {
        console.error('Error: Skill not found in admin pending list');
    }
    console.log('5. Approve the skill...');
    const approveRes = await (0, node_fetch_1.default)(`${baseUrl}/skills/${newSkill.id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'approved' }),
    });
    if (!approveRes.ok) {
        console.error('Approve failed:', await approveRes.text());
        return;
    }
    const approvedSkill = await approveRes.json();
    console.log(`Skill status updated to: ${approvedSkill.status}`);
    console.log('6. Verify public list again (should contain the skill)...');
    const publicListRes2 = await (0, node_fetch_1.default)(`${baseUrl}/skills`);
    const publicList2 = await publicListRes2.json();
    const inPublic2 = publicList2.find((s) => s.id === newSkill.id);
    if (inPublic2) {
        console.log('Success: Skill is now public.');
    }
    else {
        console.error('Error: Skill still not in public list after approval');
    }
    console.log('7. Cleanup (delete skill)...');
    const deleteRes = await (0, node_fetch_1.default)(`${baseUrl}/skills/${newSkill.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (deleteRes.ok) {
        console.log('Skill deleted.');
    }
    else {
        console.error('Delete failed:', await deleteRes.text());
    }
}
run().catch(console.error);
//# sourceMappingURL=verify_audit_flow.js.map