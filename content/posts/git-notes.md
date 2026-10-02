---
title: 我的 Git 生存手册
date: 2026-09-10
tags: [工具, 笔记]
excerpt: 十个我每周都会用到的 Git 命令，以及把历史改干净的几条规矩。
---

Git 不需要学全，需要的是**出事时能救回来**。下面是我真正常用的部分。

## 日常十连

```bash
git status -s              # 短格式看状态
git switch -c feat/x       # 新建并切换分支
git add -p                 # 分块暂存，避免把调试代码混进去
git commit -m "feat: ..."  # 约定式提交
git switch -               # 回到上一个分支
git fetch --prune          # 同步并清理已删除的远端分支
git pull --rebase          # 变基拉取，历史保持一条线
git push -u origin HEAD    # 首次推送当前分支
git log --oneline --graph -20
git restore --staged .     # 撤销已 add 的内容
```

## 修改上一次提交

```bash
git commit --amend --no-edit   # 只补文件，不改信息
git commit --amend -m "fix: 真正的描述"
```

注意：**只对自己还没推送的提交用**。推过之后 amend 会改写公共历史。

## 交互式变基整理历史

```bash
git rebase -i HEAD~3
```

常用动作：

| 动作 | 作用 |
| --- | --- |
| `pick` | 保留 |
| `squash` | 合并到上一个提交 |
| `reword` | 只改提交信息 |
| `drop` | 删掉这次提交 |

## 救命三件套

```bash
git stash -u           # 连未跟踪文件一起暂存
git reflog             # 看所有 HEAD 移动记录（真正的后悔药）
git reset --hard <sha> # 回到某个点（确认无未提交内容再用）
```

`git reflog` 是我在 Git 里最喜欢的东西：只要提交过一次，它基本就还在，90 天之内都能捞回来。

## 几条自己的规矩

1. **一个提交只做一件事** —— 将来 `bisect` 和回滚都会感谢你
2. **提交信息写"为什么"，不写"改了什么"** —— 改动本身 `diff` 里就有
3. **主分支永远可部署** —— 没写完的东西留在分支或者 WIP 提交里
4. **不要 force push 共享分支** —— 唯一例外是自己独占的功能分支，且用 `--force-with-lease`

## 别名

```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset --soft HEAD~1"
```

> `reset --soft` 是我最常用的"后悔键"：提交退回去，改动还在暂存区，什么都没丢。
