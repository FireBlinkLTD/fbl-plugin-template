import {
    ActionHandler, 
    ActionProcessor,
    ActionSnapshot,
    IActionHandlerMetadata, 
    IContext, 
    IDelegatedParameters,
//    FlowService,
} from 'fbl';
import { PluginActionProcessor } from '../processors';
//import {Container} from 'typedi';

export class PluginActionHandler extends ActionHandler {
    private static metadata = <IActionHandlerMetadata> {
        id: 'namespace.plugin-id',
        aliases: [
            // Register aliases for your action handler.
            // You can also override other plugins if you want to by specifying their id or alias in the list,
            // just be careful with the order of loading ;)
            'namespace.plugin-id-alias'
        ]

        // If you want to manually process EJS template inside your options uncomment the following line
        // skipTemplateProcessing: true,

        // If entire options set contains sensitive information - uncomment following line to mask in in report.
        // considerOptionsAsSecrets: true,
    };

    getMetadata(): IActionHandlerMetadata {
        return PluginActionHandler.metadata;
    }

    getProcessor(options: any, context: IContext, snapshot: ActionSnapshot, parameters: IDelegatedParameters): ActionProcessor {
        return new PluginActionProcessor(options, context, snapshot, parameters);
    }
}
