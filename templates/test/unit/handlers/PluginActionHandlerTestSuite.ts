import {suite, test} from 'mocha-typescript';
import {PluginActionHandler} from '../../../src/handlers';
import {IContext} from 'fbl/dist/src/interfaces';
import {ActionSnapshot} from 'fbl/dist/src/models';
import {ContextUtil} from 'fbl/dist/src/utils';
import * as assert from 'assert';
import {Container} from 'typedi';
import {ActionHandlersRegistry, FlowService} from 'fbl/dist/src/services';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const plugin = require('../../../');

@suite()
class PluginActionHandlerTestSuite {

    after() {
        Container.get(ActionHandlersRegistry).cleanup();
    }

    @test()
    async failValidation(): Promise<void> {
        const actionHandler = new PluginActionHandler();

        const context = <IContext> {
            ctx: {}
        };

        const snapshot = new ActionSnapshot('.', {}, '', 0, {});

        await chai.expect(
            actionHandler.validate([], context, snapshot, {})
        ).to.be.rejected;
    }

    @test()
    async passValidation(): Promise<void> {
        const actionHandler = new PluginActionHandler();

        const context = <IContext> {
            ctx: {}
        };

        const snapshot = new ActionSnapshot('.', {}, '', 0, {});

        await chai.expect(
            actionHandler.validate({
                test: true
            }, context, snapshot, {})
        ).to.be.not.rejected;
    }

    @test()
    async passExecution(): Promise<void> {
        const actionHandlerRegistry = Container.get(ActionHandlersRegistry);
        const flowService = Container.get(FlowService);

        const actionHandler = new PluginActionHandler();
        actionHandlerRegistry.register(actionHandler, plugin);

        const context = ContextUtil.generateEmptyContext();

        const options = {
            test: true
        };

        const snapshot = await flowService.executeAction(
            '.',
            actionHandler.getMetadata().id,
            {},
            options,
            context,
            {}
        );

        assert(snapshot.successful);
    }
}
