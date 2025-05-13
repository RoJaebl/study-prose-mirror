import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import "prosemirror-view/style/prosemirror.css";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { exampleSetup } from "prosemirror-example-setup";
import "prosemirror-menu/style/menu.css";

let state = EditorState.create({
  schema,
  // plugins: [history(), keymap({ "Mod-z": undo, "Mod-y": redo, ...baseKeymap })],
  plugins: [...exampleSetup({ schema })],
});
let view = new EditorView(document.querySelector("#editor")!, { state });
