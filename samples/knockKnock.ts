import { MemoryStorage, ConsoleAdapter } from 'botbuilder';
import { Topic, prettyConsole, Waterfall } from '../src/topical';

Topic.init(new MemoryStorage());

const adapter = new ConsoleAdapter();

adapter
    .use(prettyConsole)
    .listen(async context => {
        await Root.do(context);
    });

class KnockKnock extends Waterfall {

    waterfall = () => [
        () => this.context.sendActivity(`Who's there?`),

        () => this.context.sendActivity(`${this.text} who?`),

        () => this.context.sendActivity(`Hilarious!`),
    ];

    // uses default onBegin, onTurn, onChildReturn
}

class Root extends Topic {

    static subtopics = [KnockKnock];

    async onBegin () {
        await this.context.sendActivity(`Tell me a knock knock joke`);
    }

    async onTurn () {
        if (this.text === 'knock knock') {
            await this.beginChild(KnockKnock);
            return;
        }

        if (await this.dispatchToChild())
            return;
    }

    async onChildReturn (child: KnockKnock) {
        this.clearChildren();

        await this.context.sendActivity(`That was fun. Tell me another.`);
    }
}