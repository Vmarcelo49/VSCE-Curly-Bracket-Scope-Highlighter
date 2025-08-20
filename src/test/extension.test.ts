import * as assert from "assert"
import * as vscode from "vscode"
import { findAllBlockRanges, findVerticalScopes } from "../extension" // Убедись, что путь к функции правильный

suite("Curly Scope Highlighter Tests", () => {
  test("Finds all curly brace blocks correctly", async () => {
    const testDocument = await vscode.workspace.openTextDocument({
      content: `
        function test() {
          if (true) {
            console.log("Hello");
          }
        }
      `,
      language: "javascript",
    })

    const ranges = findAllBlockRanges(testDocument)

    // Ожидаем два блока { }
    assert.strictEqual(ranges.length, 2, "Should find two block ranges")
  })

  test("Finds vertical scopes (curly brackets) correctly", async () => {
    const testDocument = await vscode.workspace.openTextDocument({
      content: `
        function test() {
          if (true) {
            console.log("Hello");
          }
        }
      `,
      language: "javascript",
    })

    const verticalRanges = findVerticalScopes(testDocument)

    // Ожидаем четыре диапазона для вертикальных скобок (по два для каждого блока: открывающая и закрывающая)
    assert.strictEqual(verticalRanges.length, 4, "Should find four vertical scope ranges")
    
    // Проверим, что диапазоны имеют правильную длину (1 символ каждый)
    verticalRanges.forEach((range, index) => {
      const start = range.start
      const end = range.end
      assert.strictEqual(
        end.character - start.character, 
        1, 
        `Vertical scope range ${index} should be exactly 1 character wide`
      )
    })
  })

  test("Does not highlight if feature is disabled", async () => {
    const editor = await vscode.window.showTextDocument(
      await vscode.workspace.openTextDocument({
        content: `function x() { return 42; }`,
        language: "javascript",
      })
    )

    const decorationsBefore = editor.visibleRanges.length
    vscode.commands.executeCommand("curly-scope-highlighter.colorScope") // Выключаем

    const decorationsAfter = editor.visibleRanges.length
    assert.strictEqual(
      decorationsAfter,
      decorationsBefore,
      "No highlighting should be applied when disabled"
    )
  })

  test("Updates highlight on text change", async () => {
    const editor = await vscode.window.showTextDocument(
      await vscode.workspace.openTextDocument({
        content: `function test() { }`,
        language: "javascript",
      })
    )

    const initialRanges = findAllBlockRanges(editor.document)
    assert.strictEqual(
      initialRanges.length,
      1,
      "Should initially find one block"
    )

    await editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(0, 20), " { console.log(42); }")
    })

    const updatedRanges = findAllBlockRanges(editor.document)
    assert.strictEqual(
      updatedRanges.length,
      2,
      "Should update and find two blocks"
    )
  })

  test("Does not create vertical scopes for single-line braces", async () => {
    const testDocument = await vscode.workspace.openTextDocument({
      content: `function singleLine() { return 42; }`,
      language: "javascript",
    })

    const verticalRanges = findVerticalScopes(testDocument)

    // Не должно быть вертикальных скобок для однострочных блоков
    assert.strictEqual(verticalRanges.length, 0, "Should not find vertical scopes for single-line blocks")
  })
})
