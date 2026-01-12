import { Actions$ } from '../../../../../../Shared/actions/actions';
import { map } from 'rxjs';
import { MermaidConfig } from '../../../../../../Shared/actions/types';

const styles: string[] = [];

export const mermaidOutput$ = Actions$.presetState.asObservable().pipe(
    map((presetState) => {
        const mermaidEntries = presetState
            .reduce(
                (entries, { mermaid }) => entries.concat(mermaid),
                [] as MermaidConfig[],
            )
            .filter(Boolean);

        const singleEntries = mermaidEntries.filter(
            (entry) => entry && !entry.subgraph,
        );
        const groupedEntries = mermaidEntries.filter(
            (entry) => !!(entry && entry.subgraph),
        );

        const outputByGroup = groupedEntries.reduce<Record<string, string[]>>(
            (group, config) => {
                const { subgraph } = config;
                if (subgraph) {
                    group[subgraph] = group[subgraph] || ([] as string[]);
                    group[subgraph].push(config.entry);
                }
                return group;
            },
            {},
        );

        const mermaidOutput =
            'flowchart TD\n' +
            singleEntries
                .map(({ entry }) => entry)
                .concat(styles)
                .join('\n');

        console.log('mermaidOutput', mermaidOutput);

        return Object.entries(outputByGroup).reduce(
            (output, [subGraph, entries]) => {
                let subGraphOutput = `\nsubgraph ${subGraph}\n  `;
                subGraphOutput += entries.join('\n  ');
                subGraphOutput += '\nend';

                return output + '\n' + subGraphOutput;
            },
            mermaidOutput,
        );
    }),
);
