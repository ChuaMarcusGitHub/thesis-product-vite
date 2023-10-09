import { SandboxActionsType } from "@features/Sandbox/actions/SandboxActions";
import { SandboxReducerState } from "@features/Sandbox/type/SandboxTypes";

const initialState:SandboxReducerState = {
    testItem: [],
}
const sandboxReducer = (state = initialState, action:{ type: SandboxActionsType, payload: any}) => {
    switch (action.type){
        case SandboxActionsType.INIT:
            return;
        default: 
            return state;
    }
}
export default sandboxReducer;