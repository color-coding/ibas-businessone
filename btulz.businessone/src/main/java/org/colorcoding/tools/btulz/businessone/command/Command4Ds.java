package org.colorcoding.tools.btulz.businessone.command;

import org.colorcoding.tools.btulz.businessone.transformer.DsTransformer;
import org.colorcoding.tools.btulz.command.Argument;
import org.colorcoding.tools.btulz.command.Command;
import org.colorcoding.tools.btulz.command.Prompt;
import org.colorcoding.tools.btulz.util.ArrayList;

@Prompt(Command4Ds.COMMAND_PROMPT)
public class Command4Ds extends Command<Command4Ds> {

	public final static String COMMAND_PROMPT = "ds";

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
		arguments.add(new Argument("-Language", "B1使用语言"));
		arguments.add(new Argument("-Domains", "使用的模型目录或文件"));
		return arguments.toArray(new Argument[] {});
	}

	@Override
	protected boolean isRequiredArguments() {
		return true;// 有参数才调用
	}

	@Override
	protected int run(Argument[] arguments) {
		try {
			DsTransformer dsTransformer = new DsTransformer();
			for (Argument argument : arguments) {
				if (!argument.isInputed()) {
					// 没有输出的参数不做处理
					continue;
				}
				if (argument.getName().equalsIgnoreCase("-Server")) {
					dsTransformer.setServer(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-CompanyDB")) {
					dsTransformer.setCompanyDB(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-UserName")) {
					dsTransformer.setUserName(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-Password")) {
					dsTransformer.setPassword(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-DbServerType")) {
					dsTransformer.setDbServerType(this.getDbServerType(argument.getValue()));
				} else if (argument.getName().equalsIgnoreCase("-DbUser")) {
					dsTransformer.setDbUserName(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-DbPassword")) {
					dsTransformer.setDbPassword(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-LicenseServer")) {
					dsTransformer.setLicenseServer(argument.getValue());
				} else if (argument.getName().equalsIgnoreCase("-Language")) {
					dsTransformer.setLanguage(this.getLanguage(argument.getValue()));
				} else if (argument.getName().equalsIgnoreCase("-Domains")) {
					dsTransformer.addDomains(argument.getValue());
				}
			}
			dsTransformer.transform();
			return RETURN_VALUE_SUCCESS;
		} catch (Exception e) {
			this.print(e);
			return RETURN_VALUE_COMMAND_EXECUTION_FAILD;
		}
	}

	private Integer getDbServerType(String value) {

		return -1;
	}

	private Integer getLanguage(String value) {

		return -1;
	}
}
