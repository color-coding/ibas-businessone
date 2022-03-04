package org.colorcoding.tools.btulz.businessone.command;

import org.colorcoding.tools.btulz.businessone.transformer.OutTransformer;
import org.colorcoding.tools.btulz.command.Argument;
import org.colorcoding.tools.btulz.command.Command;
import org.colorcoding.tools.btulz.command.Prompt;
import org.colorcoding.tools.btulz.util.ArrayList;

@Prompt(Command4Out.COMMAND_PROMPT)
public class Command4Out extends Command<Command4Out> {

	public final static String COMMAND_PROMPT = "out";

	public Command4Out() {
		this.setName(COMMAND_PROMPT);
		this.setDescription("提取B1账套中的自定义字段");
	}

	@Override
	protected Argument[] createArguments() {
		ArrayList<Argument> arguments = new ArrayList<>();
		// 添加自身参数
		arguments.add(new Argument("-Server", "B1服务地址"));
		arguments.add(new Argument("-CompanyDB", "账套名称"));
		arguments.add(new Argument("-UserName", "B1用户"));
		arguments.add(new Argument("-Password", "B1密码"));
		arguments.add(new Argument("-DbServerType", "数据库类型"));
		arguments.add(new Argument("-DbUser", "数据库用户"));
		arguments.add(new Argument("-DbPassword", "数据库密码"));
		arguments.add(new Argument("-LicenseServer", "B1许可证地址"));
		arguments.add(new Argument("-SLDServer", "SLD架构地址"));
		arguments.add(new Argument("-Language", "B1使用语言"));
		arguments.add(new Argument("-OutputFolder", "数据输出目录"));
		return arguments.toArray(new Argument[] {});
	}

	@Override
	protected boolean isRequiredArguments() {
		return true;// 有参数才调用
	}

	@Override
	protected int run(Argument[] arguments) {
		try {
			OutTransformer transformer = new OutTransformer();
			for (Argument argument : arguments) {
				if (!argument.isInputed()) {
					// 没有输出的参数不做处理
					continue;
				}
				if (argument.getName().equalsIgnoreCase("-Server")) {
					transformer.setServer(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-CompanyDB")) {
					transformer.setCompanyDB(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-UserName")) {
					transformer.setUserName(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-Password")) {
					transformer.setPassword(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-DbServerType")) {
					transformer.setDbServerType(this.getDbServerType(argument.getValue()));
				} else if (argument.getName().equalsIgnoreCase("-DbUser")) {
					transformer.setDbUserName(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-DbPassword")) {
					transformer.setDbPassword(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-LicenseServer")) {
					transformer.setLicenseServer(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-SLDServer")) {
					transformer.setSLDServer(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-Language")) {
					transformer.setLanguage(this.getLanguage(argument.getValue()));
				} else if (argument.getName().equalsIgnoreCase("-OutputFolder")) {
					transformer.setOutputFolder(argument.getValue());
				}
			}
			transformer.transform();
			return RETURN_VALUE_SUCCESS;
		} catch (Exception e) {
			this.print(e);
			return RETURN_VALUE_COMMAND_EXECUTION_FAILD;
		}
	}

	private Integer getDbServerType(String value) {
		return Integer.valueOf(value);
	}

	private Integer getLanguage(String value) {
		return Integer.valueOf(value);
	}
}
