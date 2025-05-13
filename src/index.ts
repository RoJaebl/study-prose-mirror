import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import "prosemirror-view/style/prosemirror.css";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";

/**
 * 플러그인을 state를 생성할 때 등록하여 사용할 수 있다.
 */
let state = EditorState.create({
  schema,
  plugins: [history(), keymap({ "Mod-z": undo, "Mod-y": redo })],
});
let view = new EditorView(document.querySelector("#editor")!, { state });
