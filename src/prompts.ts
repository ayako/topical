import { Prompt, hasText, hasNumber, Culture, Validator } from './topical';
import { TurnContext } from 'botbuilder';

export class TextPrompt <
    PromptArgs = any,
    Context extends TurnContext = TurnContext,
> extends Prompt<string, PromptArgs, {}, Context> {

    validator = hasText;
}
TextPrompt.register();

export interface CultureConstructor {
    culture: string;
}

export class NumberPrompt <
    PromptArgs = any,
    Context extends TurnContext = TurnContext,
> extends Prompt<number, PromptArgs, CultureConstructor, Context> {

    constructor(construct: CultureConstructor) {
        super(construct);
        this.validator = hasNumber(construct.culture);
    }
}
NumberPrompt.register();