package org.colorcoding.tools.btulz.businessone.command;

import org.colorcoding.tools.btulz.command.Argument;
import org.colorcoding.tools.btulz.command.Command;
import org.colorcoding.tools.btulz.command.Prompt;

@Prompt(Command4Code.COMMAND_PROMPT)
public class Command4Code extends Command<Command4Code> {

	public final static String COMMAND_PROMPT = "code";

	@Override
	protected Argument[] createArguments() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected boolean isRequiredArguments() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected int run(Argument[] arguments) {
		// TODO Auto-generated method stub
		return 0;
	}

}
