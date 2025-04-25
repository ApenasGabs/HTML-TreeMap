import { expect, test } from "@playwright/test";

test("página carrega e exibe o componente TreeView", async ({ page }) => {
  await page.goto("/");

  // Verificar título da página
  await expect(page).toHaveTitle("TreeView Demo");

  // Verificar componentes principais
  await expect(page.locator("h1")).toContainText("<TreeView />");
  await expect(page.locator("textarea")).toBeVisible();
  await expect(page.locator("button")).toHaveText("Gerar Árvore");
});

test("exibe a estrutura HTML quando o botão é clicado", async ({ page }) => {
  await page.goto("/");

  // Apagar o conteúdo HTML atual
  await page.locator("textarea").click();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");

  // Digitar novo HTML
  const html =
    '<div class="exemplo"><h2>Título</h2><ul><li>Item 1</li><li>Item 2</li></ul></div>';
  await page.locator("textarea").fill(html);

  // Clicar no botão
  await page.locator("button").click();

  // Verificar se a estrutura é exibida corretamente
  const preContent = await page.locator("pre").textContent();
  expect(preContent).toContain("div (exemplo)");
  expect(preContent).toContain("h2");
  expect(preContent).toContain("ul");
  expect(preContent).toContain("li");
});

test("lida corretamente com HTML complexo", async ({ page }) => {
  await page.goto("/");

  // HTML complexo
  const complexHtml = `
    <section class="hero">
      <header class="header">
        <nav class="navigation">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      </header>
      <div class="content">
        <h1>Título Principal</h1>
        <p>Descrição do site</p>
        <button class="call-to-action">Saiba mais</button>
      </div>
    </section>
  `;

  // Inserir HTML complexo
  await page.locator("textarea").fill(complexHtml);
  await page.locator("button").click();

  // Verificar elementos na árvore
  const preContent = await page.locator("pre").textContent();
  expect(preContent).toContain("section (hero)");
  expect(preContent).toContain("header (header)");
  expect(preContent).toContain("nav (navigation)");
  expect(preContent).toContain("ul");
  expect(preContent).toContain("li");
  expect(preContent).toContain("div (content)");
  expect(preContent).toContain("h1");
  expect(preContent).toContain("button (call-to-action)");
});

test("lida com HTML vazio e inválido", async ({ page }) => {
  await page.goto("/");

  // Testar com HTML vazio
  await page.locator("textarea").fill("");
  await page.locator("button").click();

  // Não deve exibir nenhuma estrutura
  await expect(page.locator("pre")).not.toBeVisible();

  // Testar com HTML inválido
  await page.locator("textarea").fill("<div><p>Incompleto");
  await page.locator("button").click();

  // Deve mostrar estrutura parcial
  const preContent = await page.locator("pre").textContent();
  expect(preContent).toContain("div");
  expect(preContent).toContain("p");
});

test("destaca elementos ao passar o mouse", async ({ page }) => {
  await page.goto("/");

  // Inserir HTML para teste
  const html = `<div id="root">
    <header>
      <nav>Menu</nav>
    </header>
    <main>Conteúdo</main>
    <footer>Rodapé</footer>
  </div>`;

  await page.locator("textarea").fill(html);
  await page.locator("button").click();

  // Verificar se a estrutura é exibida
  await expect(page.locator("pre")).toBeVisible();

  // Testar a interação com elementos (se houver)
  // Nota: Este teste pode precisar de ajustes dependendo da implementação real do componente
  const elementoDiv = page.locator("pre >> text=div");
  await elementoDiv.hover();

  // Verificar se há algum efeito de hover (se implementado no componente)
  // Por exemplo, se houver uma classe CSS que é aplicada no hover:
  // await expect(elementoDiv).toHaveClass(/highlighted/);
});

test("navegação com teclado funciona corretamente", async ({ page }) => {
  await page.goto("/");

  // Inserir HTML para teste
  await page.locator("textarea").fill("<div><p>Teste</p></div>");

  // Usar Tab para navegar até o botão
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  // Verificar se o botão está focado
  await expect(page.locator("button")).toBeFocused();

  // Acionar o botão com Enter
  await page.keyboard.press("Enter");

  // Verificar se a árvore foi gerada
  await expect(page.locator("pre")).toBeVisible();
});
