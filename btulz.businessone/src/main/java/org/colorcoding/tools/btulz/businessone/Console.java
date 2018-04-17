package org.colorcoding.tools.btulz.businessone;

import org.colorcoding.tools.btulz.businessone.command.Command4Code;
import org.colorcoding.tools.btulz.businessone.command.Command4Ds;
import org.colorcoding.tools.btulz.command.CommandsManager;

public class Console {
	private volatile static CommandsManager commandsManager;

	protected synchronized static CommandsManager getCommandsManager() {
		if (commandsManager == null) {
			synchronized (Console.class) {
				if (commandsManager == null) {
					commandsManager = new CommandsManager();
					// 注册发布的命令
					commandsManager.register(Command4Code.class);
					commandsManager.register(Command4Ds.class);
				}
			}
		}
		return commandsManager;
	}

	public static void main(String[] args) {
		getCommandsManager().run(args);
	}
}
