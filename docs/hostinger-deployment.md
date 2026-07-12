# GoAI Hostinger 部署说明

本文适合不熟悉技术部署的用户。GoAI 当前是一个单一 Next.js 应用，没有数据库、登录、支付、CMS 或独立 API。

## 推荐部署方式

优先推荐：Hostinger 的 Node.js / Git 部署。

原因：
- 当前项目使用 Next.js App Router。
- 保留 Node.js 部署方式最稳，不需要为了静态导出修改架构。
- 后续如果增加动态页面、表单服务或 API，会更容易扩展。

备选方式：静态导出后上传。

当前页面大多可以静态生成，但本项目暂不建议立即改成 `output: "export"`，避免后续功能扩展时反复调整部署方式。

## 当前 next.config.ts 判断

当前配置：

```ts
const nextConfig = {
  reactStrictMode: true
};
```

结论：
- 适合 Node.js 部署。
- 没有强制静态导出。
- 没有依赖数据库或服务器环境。
- Hostinger 若支持 Node.js 应用和 Git 部署，优先使用该方式。

## Node.js 版本

建议使用 Node.js 20 或 Node.js 22。

如果 Hostinger 控制台允许选择版本，优先选择 Node.js 20 LTS；如果只提供更新版本，Node.js 22 也可以。

## 本地安装依赖

在项目目录运行：

```bash
pnpm install
```

如果电脑没有 pnpm，先安装 pnpm，或使用项目环境中已有的 pnpm。

## 本地构建命令

```bash
pnpm build
```

看到 `Compiled successfully` 表示构建成功。

## 本地启动或预览

开发预览：

```bash
pnpm dev
```

生产模式预览：

```bash
pnpm build
pnpm start
```

默认访问：

```text
http://localhost:3000/en
```

## GitHub 推送步骤

1. 在 GitHub 创建一个新仓库，例如 `goai`。
2. 在本地项目目录提交代码。
3. 添加 GitHub 远程仓库。
4. 推送到 GitHub。

常用命令示例：

```bash
git add .
git commit -m "Prepare GoAI beta release"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

把 `YOUR_GITHUB_REPOSITORY_URL` 换成 GitHub 仓库地址。

## Hostinger 中需要点击的位置

不同 Hostinger 套餐界面可能略有不同，通常路径如下：

1. 登录 Hostinger。
2. 进入 `Websites`。
3. 选择要部署 GoAI 的网站。
4. 打开 `Dashboard`。
5. 找到 `Advanced` 或 `Developer` 区域。
6. 选择 `Node.js`、`Git` 或 `Git Deployment`。
7. 连接 GitHub 仓库。
8. 选择分支：`main`。
9. 设置构建和启动命令。

如果当前套餐没有 Node.js 或 Git Deployment，请联系 Hostinger 支持确认是否需要升级到支持 Node.js 的套餐。

## Hostinger 构建命令

```bash
pnpm install && pnpm build
```

如果 Hostinger 不支持 pnpm，可以在控制台中先启用 Corepack，或改用：

```bash
corepack enable && pnpm install && pnpm build
```

## Hostinger 启动命令

```bash
pnpm start
```

该命令会运行 Next.js 生产服务器。

## 输出目录

Node.js 部署方式不需要上传 `out` 目录。

Hostinger 应运行项目根目录，并使用：

```text
.next
```

作为 Next.js 构建产物目录。

如果未来选择静态导出，输出目录才会是：

```text
out
```

## 环境变量位置

在 Hostinger 项目或 Node.js 应用设置中找到 `Environment Variables`。

建议添加：

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

把 `https://your-domain.com` 换成正式域名。

## 域名绑定方法

1. 在 Hostinger 中进入网站管理。
2. 打开 `Domains` 或 `Manage Domain`。
3. 选择要绑定的域名。
4. 将域名指向当前网站或 Node.js 应用。
5. 等待 DNS 生效。

DNS 生效可能需要几分钟到 24 小时。

## SSL 开启方法

1. 在 Hostinger 网站面板中打开 `Security`。
2. 找到 `SSL`。
3. 为绑定域名开启 SSL。
4. 等待证书签发。
5. 确认网站可以通过 `https://` 访问。

## 重新部署方法

如果使用 Git 部署：

1. 本地修改代码。
2. 提交并推送到 GitHub。
3. Hostinger 通常会自动重新部署。
4. 如果没有自动部署，在 Hostinger Git Deployment 页面点击 `Redeploy`。

## 回滚方法

简单回滚方式：

1. 在 GitHub 找到上一个稳定提交。
2. 在本地回退到该提交或创建修复提交。
3. 推送到 GitHub。
4. 在 Hostinger 重新部署。

如果 Hostinger 面板提供 Deployment History，可以直接选择之前成功的版本并点击回滚。

## 常见错误及解决方式

### 构建失败：pnpm not found

解决：

```bash
corepack enable
```

然后重新部署。

### 构建失败：Node.js 版本过低

解决：

在 Hostinger Node.js 设置中选择 Node.js 20 或 22。

### 页面打开是 404

检查：

- 是否访问 `/en`。
- Hostinger 是否正确运行 `pnpm start`。
- 域名是否绑定到 Node.js 应用。

### 样式丢失

检查：

- 是否执行了 `pnpm build`。
- 是否上传或部署了完整项目，而不是只上传部分文件。

### 网站不是 HTTPS

解决：

在 Hostinger SSL 面板开启 SSL，并等待证书生效。

### 修改后线上没变化

解决：

1. 确认代码已经推送到 GitHub。
2. 在 Hostinger 点击 `Redeploy`。
3. 清理浏览器缓存后重新访问。
