package org.colorcoding.tools.btulz.businessone;

import java.io.File;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.colorcoding.tools.btulz.Environment;
import org.colorcoding.tools.btulz.businessone.model.Domain;
import org.colorcoding.tools.btulz.businessone.transformer.XmlTransformer;
import org.colorcoding.tools.btulz.model.IDomain;
import org.colorcoding.tools.btulz.transformer.MultiTransformException;
import org.colorcoding.tools.btulz.transformer.TransformException;

import junit.framework.TestCase;

public class TestXmlTransformer extends TestCase {

	public void testLoad() throws ClassNotFoundException, TransformException, MultiTransformException, JAXBException {
		XmlTransformer xmlTransformer = new XmlTransformer();
		xmlTransformer.load(Environment.getWorkingFolder() + "/ds_tt_userobjects.xml".replace("/", File.separator),
				false);
		JAXBContext context = JAXBContext.newInstance(Domain.class);
		Marshaller marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		marshaller.setProperty(Marshaller.JAXB_FRAGMENT, true);

		System.out.println("序列化输出：");
		for (IDomain item : xmlTransformer.getWorkingDomains()) {
			StringWriter writer = new StringWriter();
			marshaller.marshal(item, writer);
			String oldXML = writer.toString();
			System.out.println(oldXML);
		}
	}
}
