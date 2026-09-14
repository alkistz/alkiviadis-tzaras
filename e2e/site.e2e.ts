import { expect, test } from '@playwright/test';

test('homepage introduces one person', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Alkis Tzaras');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Alkis Tzaras');
	await expect(page.getByRole('navigation', { name: 'Site' }).getByRole('link')).toHaveCount(3);
	await expect(page.getByRole('navigation', { name: 'Elsewhere' }).getByRole('link')).toHaveCount(
		3
	);
});

test('inner pages share the shell and are reachable', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'work' }).click();
	await expect(page).toHaveURL(/\/work$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work');

	await page.getByRole('link', { name: 'kiden' }).click();
	await expect(page).toHaveURL(/\/work\/kiden$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('kiden');

	await page.getByRole('link', { name: 'writing' }).click();
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Writing');
});

test('ships no client-side JavaScript', async ({ page }) => {
	const scripts: string[] = [];
	page.on('request', (request) => {
		if (request.resourceType() === 'script') scripts.push(request.url());
	});
	await page.goto('/');
	expect(scripts).toEqual([]);
});

test('sitemap and robots are served', async ({ request }) => {
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.ok()).toBe(true);
	expect(await sitemap.text()).toContain('/work/kiden');

	const robots = await request.get('/robots.txt');
	expect(robots.ok()).toBe(true);
});
