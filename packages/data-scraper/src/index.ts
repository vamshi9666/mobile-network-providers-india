import {Command, flags} from '@oclif/command';
import {writeFileSync} from 'fs';
import {join, resolve} from 'path';
import getData from './get-data';

class MobileNetworkProvidersIndia extends Command {
  static description = 'describe the command here';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  };

  static args = [{name: 'file'}];

  async run() {
    const {args, flags} = this.parse(MobileNetworkProvidersIndia);

    const res = await getData();

    // this.log('Pretty output is ', res);
    const outJson = join(resolve('./'), './result/data.json');
    writeFileSync(outJson, JSON.stringify(res), 'utf8');
  }
}

export = MobileNetworkProvidersIndia;
