import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import "prosemirror-view/style/prosemirror.css";

let state = EditorState.create({ schema });
let view = new EditorView(document.querySelector("#editor")!, {
  state,
  /**
   * 트랜잭션이 생성될 때마다 호출되는 콜백 함수이다. 이를 통해 view의 업데이트 과정에 개입할 수 있다.
   *
   * @param {Transaction} tr Transaction는 에디터에 사용자가 입력하거나 뷰와 상호 작용할 때 생성되는 `상태 트랜잭션`이다.
   */
  dispatchTransaction: (tr) => {
    // 새롭게 생성된 트랜잭션으로 이전 상태와 현재 상태를 확인할 수 있다.
    console.log(
      "Document size went from",
      tr.before.content.size,
      "to",
      tr.doc.content.size
    );
    let newState = view.state.apply(tr); // 상태 트랜잭션으로 새로운 state를 생성한다.
    view.updateState(newState); // 생성된 state를 updateState하여 뷰를 업데이트한다.
  },
});
