import {
    IDelegatedParameters,
    ContextUtil, 
    ActionSnapshot, 
    ActionHandlersRegistry, 
    FlowService
} from 'fbl';
import {suite, test} from 'mocha-typescript';
import * as assert from 'assert';
import {Container} from 'typedi';

import {PluginActionHandler} from '../../../src/handlers';

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

        const context = ContextUtil.generateEmptyContext();
        const snapshot = new ActionSnapshot('.', {}, '', 0, {});

        await chai.expect(
            actionHandler.getProcessor([], context, snapshot, {}).validate()
        ).to.be.rejected;
    }

    @test()
    async passValidation(): Promise<void> {
        const actionHandler = new PluginActionHandler();

        const context = ContextUtil.generateEmptyContext();
        const snapshot = new ActionSnapshot('.', {}, '', 0, {});

        await chai.expect(
            actionHandler.getProcessor({
                test: true
            }, context, snapshot, {}).validate()
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
            // wd
            '.',
            // action id with options        
            {   
                [actionHandler.getMetadata().id]: options
            },
            // shared context
            context,
            // delegated parameters
            <IDelegatedParameters> {}
        );

        assert(snapshot.successful);
    }
}
