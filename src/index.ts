import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import "prosemirror-view/style/prosemirror.css";
import { DOMParser } from "prosemirror-model";

let content = document.getElementById("content"); // DOM 노드를 쿼리한다.
let state = EditorState.create({
  // doc 요소를 추가할때 schema 요소를 생략해도 된다.
  // schema: schema
  // DOMParser를 이용하여 스키마를 따르는 문서 파서를 생성하고 쿼리한 DOM 노드를 ProseMirror 요소로 파싱한다.
  doc: DOMParser.fromSchema(schema).parse(content!),
});
let view = new EditorView(document.querySelector("#editor")!, { state });
