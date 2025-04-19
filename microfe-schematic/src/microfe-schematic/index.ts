import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function microfeSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // 1. Thêm webpack.config.js

    // const webpackConfig = `// webpack.config.js content`;
    // tree.create('/webpack.config.js', webpackConfig);

    // // 2. Modify angular.json
    // const angularJsonBuffer = tree.read('angular.json');
    // if (angularJsonBuffer) {
    //   const angularJson = JSON.parse(angularJsonBuffer.toString());
    //   // Modify build -> customWebpackConfig
    //   angularJson.projects['app-name'].architect.build.options.customWebpackConfig = {
    //     path: './webpack.config.js',
    //   };
    //   tree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));
    // }

    // // 3. Add mfe.config.ts (tuỳ mình định nghĩa)
    // tree.create('/mfe.config.ts', `export const remotes = [...]`);

    // _context.logger.info('✅ Microfrontend setup complete!');
    // Logger ra cho vui
    _context.logger.info(`🚀 Setting up Module Federation for: ${_options.projectName}`);

    // B1: Load thư mục ./files làm template source
    const templateSource = apply(url('./files'), [
      // Truyền biến vào file template, có thể dùng cả string utils như dasherize, classify...
      applyTemplates({
        ...strings,         // để dùng helpers như dasherize, classify,...
        ..._options          // truyền biến projectName để template render
      }),

      // Di chuyển tất cả file từ files/ vào thư mục root (hoặc có thể move đến 'projects/xyz' nếu muốn)
      move('./')
    ]);

    // B2: Gộp các Rule lại (ở đây mới chỉ tạo file)
    return chain([
      mergeWith(templateSource)
    ]);

  };
}
